async function fetchGitHubProfile() {
    const username = document.getElementById('username').value;
    const profileContainer = document.getElementById('profile-container');
    const reposContainer = document.getElementById('repos-container');
    const followersContainer = document.getElementById('followers-container');

    // Clear previous content
    profileContainer.innerHTML = '';
    reposContainer.innerHTML = '';
    followersContainer.innerHTML = '';

    try {
        // Fetch GitHub user profile
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!profileResponse.ok) {
            throw new Error(`User not found`);
        }
        const profileData = await profileResponse.json();

        // Display profile information
        profileContainer.innerHTML = `
            <img src="${profileData.avatar_url}" alt="Avatar">
            <div class="info">
                <h2>${profileData.name || profileData.login}</h2>
                <p>${profileData.bio || "No bio available"}</p>
            </div>
        `;

        // Fetch repositories
        const reposResponse = await fetch(profileData.repos_url);
        const reposData = await reposResponse.json();
        reposContainer.innerHTML = '<h3>Repositories</h3>';
        reposData.forEach(repo => {
            reposContainer.innerHTML += `<p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>`;
        });

        // Fetch followers
        const followersResponse = await fetch(profileData.followers_url);
        const followersData = await followersResponse.json();
        followersContainer.innerHTML = '<h3>Followers</h3>';
        followersData.forEach(follower => {
            followersContainer.innerHTML += `<p><a href="${follower.html_url}" target="_blank">${follower.login}</a></p>`;
        });
    } catch (error) {
        profileContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
