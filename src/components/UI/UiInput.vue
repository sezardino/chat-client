<template>
  <input
    v-bind="$attrs"
    :class="className"
    :value="modelValue"
    :type="typeof $attrs.type === 'string' ? $attrs.type : 'text'"
    @input="(evt) => $emit('update:modelValue', (evt.target as HTMLInputElement).value)"
    name="name"
  />
</template>

<script lang="ts" setup>
interface Props {
  variant?: "primary" | "secondary";
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), { variant: "primary" });

const primaryClasses =
  "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
const secondaryClasses =
  "block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700";

const className =
  props.variant === "primary"
    ? primaryClasses
    : props.variant === "secondary"
    ? secondaryClasses
    : "";
</script>
