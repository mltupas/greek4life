let profileDatabase = [];

function myFunction() {
  console.log('hello');
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

  const newProfile = {
    [profileName] : profileInfo
  }

  profileDatabase.push(newProfile);
  alert("Profile Information Added!");
}
