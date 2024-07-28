document.addEventListener("DOMContentLoaded", () => {
  const videoCardContainer = document.querySelector('.video-container');
  const togglebutton = document.getElementById("theme-toggle")

  
  const toggletheme = () =>{
      document.body.classList.toggle("dark-theme")
      document.body.classList.toggle("light-theme")
  }
  
  document.body.classList.add("light-theme")
  
  togglebutton.addEventListener("click" , toggletheme)
  
  fetch("https://dummyapi.online/api/movies")
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
          displayVideos(data);
      })
      .catch(error => console.error('Error fetching the data:', error));

  const displayVideos = (data) => {
      if (!Array.isArray(data)) {
          console.error('Data is not an array', data);
          return;
      }

      videoCardContainer.innerHTML = ''; // Clear any existing content

      data.forEach(video => {
          if (!video || !video.image || !video.imdb_url || !video.movie) {
              console.error('Missing video data', video);
              return;
          }

          videoCardContainer.innerHTML += `
          <div class="video" onclick="location.href = '${video.imdb_url}'">
              <img src="${video.image}" class="thumbnail" alt="">
              <div class="content">
                  <div class="info">
                      <h4 class="title">${video.movie}</h4>
                      <p class="rating">Rating: ${video.rating}</p>
                  </div>
              </div>
          </div>
          `;
      });
  }
});
