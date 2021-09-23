<template>
  <svg v-if="name === 'arrowDown'" width="1.5em" height="1.5em">
    <path
      d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m-5 8l5 5l5-5H7z"
      fill="#626262"
    />
  </svg>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style>
.filter-green {
  filter: invert(48%) sepia(79%) saturate(26%) hue-rotate(86deg)
    brightness(118%) contrast(119%);
}
</style>
