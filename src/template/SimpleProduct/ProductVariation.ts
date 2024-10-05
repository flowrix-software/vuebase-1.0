import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ProductVariation',
  props: {
    attribute: {
      type: Array, 
      required: true,
    },
  },
  emits: ['variationChange'],
  setup(props, { emit }) {
    const route = useRoute();
    const selectedValue = ref(route.params.slug);

    const changeVariation = () => {
      emit('variationChange', selectedValue.value);
    };

    return {
      selectedValue,
      changeVariation,
      attribute: props.attribute,
    };
  },
});
