import { Octokit } from '@octokit/rest'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function checkRepository() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Check if the repository exists
    const { data: repo } = await octokit.rest.repos.get({
      owner: 'david1984moore',
      repo: 'Applicreations'
    });
    
    console.log('✓ Repository exists:', repo.html_url);
    console.log('✓ Default branch:', repo.default_branch);
    console.log('✓ Private:', repo.private);
    
    return true;
  } catch (error) {
    if (error.status === 404) {
      console.log('Repository does not exist. Creating it...');
      
      try {
        const octokit = await getUncachableGitHubClient();
        const { data: newRepo } = await octokit.rest.repos.createForAuthenticatedUser({
          name: 'Applicreations',
          private: false,
          auto_init: false
        });
        
        console.log('✓ Repository created:', newRepo.html_url);
        return true;
      } catch (createError) {
        console.error('Error creating repository:', createError.message);
        return false;
      }
    } else {
      console.error('Error checking repository:', error.message);
      return false;
    }
  }
}

checkRepository();
