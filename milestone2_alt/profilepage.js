let profileDatabase = {};
let currentProfile = '';

function myFunction() {
  console.log('about to create new profile');
  const profileName = $('#nameBox').val();
  const profileEmail = $('#emailBox').val();
  const profileCity = $('#cityBox').val();
  const profileInsta = $('#instaBox').val();
  const profileTwitter = $('#twitterBox').val();
  const profileSoundcloud = $('#soundcloudBox').val();
  const profileGenre = document.getElementById('Genres');
  const genreText = profileGenre.value;

  const profileInfo = {
    name : profileName,
    email : profileEmail,
    genre : genreText,
    city : profileCity,
    insta : profileInsta,
    twitter : profileTwitter,
    soundcloud : profileSoundcloud,
    connections : []
  }

  currentProfile = profileName;
  profileDatabase[profileName] = profileInfo;
  alert("Profile Information Added!");
}
