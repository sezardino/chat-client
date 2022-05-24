<template>
  <component
    v-bind="$attrs"
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :to="to || href ? to || href : null"
    :href="to"
    :class="{ [className]: true, 'w-full': isFullWidth }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "tertiary";
  to?: string;
  href?: string;
  isFullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const primaryClasses =
  "inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500";
const secondaryClasses =
  "flex-shrink-0 border-transparent text-base py-1 px-2 rounded";

const tertiaryClasses =
  "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-pink-500 hover:bg-white mt-4 lg:mt-0";

const className =
  props.variant === "primary"
    ? primaryClasses
    : props.variant === "secondary"
    ? secondaryClasses
    : tertiaryClasses;
</script>
