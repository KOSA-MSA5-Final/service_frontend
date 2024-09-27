<template>
    <div id="topBar">
      <div id="mgng-name">
        <p>멍지냥지</p>
      </div>
      <div id="mgng-img">
        <div class="image-container">
          <img src="@/assets/mgng.gif" alt="MGNG Logo" />
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  #topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    height: 80px;
    margin-bottom: 5px;
    padding: 0 15px;
  }
  
  #mgng-name {
    text-align: left;
  }
  
  #mgng-name p {
    font-family: 'HancomMalangMalang-Regular', sans-serif;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
  
  #mgng-img {
    text-align: right;
  }
  
  .image-container {
    width: 120px;
    height: 100px;
    overflow: hidden;
    position: relative;
  }
  
  .image-container img {
    position: absolute;
    top: -10px; /* Adjust this value to crop from the top */
    left: 0; /* Adjust this value to crop from the left */
    width: 120px; /* Slightly larger than container to allow for positioning */
    height: 120px;
    object-fit: cover;
  }
  </style>