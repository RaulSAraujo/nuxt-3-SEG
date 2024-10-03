import { mount } from '@vue/test-utils'
import $Clock from '~/components/home/Clock.vue'
import { describe, expect, it } from 'vitest'
import dayjs from 'dayjs'

describe('Clock - Unit', () => {

    it('should be a vue instace', () => {
        const wrapper = mount($Clock, {
            global: {
                mocks: {
                    $dayjs: dayjs
                }
            }
        })

        expect(wrapper.vm).toBeDefined()
    })
})