<template>
  <b-row id="recipe-placeholder" style="background-color: #fff;">
    <b-col lg="12">
      <b-row>
        <b-col lg="4" md="6" class="recipe-placeholder-card pb-4">
          <div class="skeleton-wrapper-body">
            <div class="skeleton-label"></div>
            <div class="skeleton-author"></div>
            <div class="skeleton-content-1"></div>
            <div class="skeleton-content-2"></div>
            <div class="skeleton-content-3"></div>
          </div>
        </b-col>
        <b-col lg="4" md="6" class="recipe-placeholder-card pb-4">
          <div class="skeleton-wrapper-body">
            <div class="skeleton-label"></div>
            <div class="skeleton-author"></div>
            <div class="skeleton-content-1"></div>
            <div class="skeleton-content-2"></div>
            <div class="skeleton-content-3"></div>
          </div>
        </b-col>
        <b-col lg="4" md="6" class="recipe-placeholder-card pb-4">
          <div class="skeleton-wrapper-body">
            <div class="skeleton-label"></div>
            <div class="skeleton-author"></div>
            <div class="skeleton-content-1"></div>
            <div class="skeleton-content-2"></div>
            <div class="skeleton-content-3"></div>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "CardPlaceholer"
};
</script>

<style scoped>
.skeleton-wrapper {
  background: #fff;
  border: 1px solid;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  margin: 10px 15px;
}

.skeleton-wrapper-inner {
  height: 150px;
  padding: 15px;
  position: relative;
}

.skeleton-wrapper-body div {
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderSkeleton;
  -webkit-animation-timing-function: linear;
  background: #f6f7f8;
  background-image: -webkit-gradient(
    linear,
    left center,
    right center,
    from(#f6f7f8),
    color-stop(0.2, #edeef1),
    color-stop(0.4, #f6f7f8),
    to(#f6f7f8)
  );
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 300px;
  height: 300px;
  position: relative;
}

.skeleton-wrapper-body {
  -webkit-animation-name: skeletonAnimate;
  background-image: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(deg),
    color-stop(0, red),
    color-stop(0.15, orange),
    color-stop(0.3, yellow),
    color-stop(0.45, green),
    color-stop(0.6, blue),
    color-stop(0.75, indigo),
    color-stop(0.8, violet),
    to(red)
  );
  background-image: -webkit-linear-gradient(
    135deg,
    red 0%,
    orange 15%,
    yellow 30%,
    green 45%,
    blue 60%,
    indigo 75%,
    violet 80%,
    red 100%
  );
  background-repeat: repeat;
  background-size: 50% auto;
}

.skeleton-wrapper-body div {
  position: absolute;
  right: 15px;
  left: 15px;
  top: 15px;
}

div.skeleton-avatar {
  height: 60px;
  width: 60px;
  border-radius: 60px;
  right: auto;
}

div.skeleton-label {
  top: 0;
  height: 230px;
  border-radius: 5px 5px 0px 0px;
}

div.skeleton-author {
  top: 260px;
  height: 25px;
  left: 35px;
  width: 300px;
}

div.skeleton-content-1,
div.skeleton-content-2,
div.skeleton-content-3 {
  left: 35px;
  right: 15px;
  height: 12px;
}

div.skeleton-content-1 {
  top: 300px;
  width: 280px;
}

div.skeleton-content-2 {
  top: 335px;
  width: 90px;
  display: inline;
}

div.skeleton-content-3 {
  top: 335px;
  width: 90px;
  left: 150px;
  display: inline;
}

@-webkit-keyframes placeholderSkeleton {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

@-webkit-keyframes skeletonAnimate {
  from {
    background-position: top left;
  }
  to {
    background-position: top right;
  }
}

div.recipe-placeholder-card {
  height: 24rem;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(#f7fafd, #f7fafd);
  background-clip: content-box, padding-box;
}
</style>