import { computed, defineComponent, h } from 'vue'
import { generateAuthUrlParams } from '../server/utils/generateAuthUrlParams'

export default defineComponent({
  name: 'LoginLink',
  props: {
    orgCode: {
      type: String,
      default: null,
    },
    authUrlParams: {
      type: Object,
      default: () => {}
    },
  },
  setup: (props, ctx) => {
    const href = computed(() => {
      const params = generateAuthUrlParams(props.orgCode, props.authUrlParams)
      return  `/api/register?${params.toString()}`
    })

    return () => h('a', {
      href: href.value,
      ...ctx.attrs
    }, ctx.slots)
  }
})
