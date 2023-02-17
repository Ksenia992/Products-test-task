<template>
  <nav>
    <div class="nav-wrapper">
      <ul class="right hide-on-med-and-down">
        <router-link
            tag="li"
            to="/"
            exact
            class="link"
        >
         Add product
        </router-link>
        <router-link
            tag="li"
            to="/products"
            class="link"
        >
          Products
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
nav {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  @media(max-width: $sm) {
    right: 15%;
  }
}

a {
  margin-right: 15px;
}

.link.active {
  color: coral;
  transition-duration: 0.3s;
}
</style>

