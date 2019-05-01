

// document.getElementById("#addProfile").onclick = function() {myFunction()};
function myFunction() {
  console.log('hello');
  const profileName = $('#nameBox').val();
  const profileEmail = $('#emailBox').val();
  const profileCity = $('#cityBox').val();
  const profileInsta = $('#instaBox').val();
  const profileTwitter = $('#twitterBox').val();
  const profileSoundcloud = $('#soundcloudBox').val();

  const profileInfo = {
    name : profileName,
    email : profileEmail,
    city : profileCity,
    insta : profileInsta,
    twitter : profileTwitter,
    soundcloud : profileSoundcloud,
  }

  Object.values(profileInfo).forEach((e)	=>	{	//	no	loop
    console.log(e) });

  alert("Profile Information Added!");

}
// $("#addProfile").click(() => {
//   const profileName = $('#nameBox').val();
//   const profileEmail = $('#emailBox').val();
//   const profileCity = $('#cityBox').val();
//   const profileInsta = $('#instaBox').val();
//   const profileTwitter = $('#twitterBox').val();
//   const profileSoundcloud = $('#soundcloudBox').val();
//   console.log('hello');
//   if(document.getElementById('button').clicked == true)
// {
//    alert("button was clicked");
// }

  // const profileInfo = {
  //   name : profileName,
  //   email : profileEmail,
  //   city : profileCity,
  //   insta : profileInsta,
  //   twitter : profileTwitter,
  //   soundcloud : profileSoundcloud,
  // }
  // Object.keys('#profileInfo').forEach((e)	=>	{	//	no	loop
	// 	console.log(e);
  // });
// });
