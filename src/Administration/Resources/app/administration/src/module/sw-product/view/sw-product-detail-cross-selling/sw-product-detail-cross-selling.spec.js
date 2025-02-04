/*
 * @package inventory
 */

import { createLocalVue, shallowMount } from '@vue/test-utils';
import swProductDetailCrossSelling from 'src/module/sw-product/view/sw-product-detail-cross-selling';
import Vuex from 'vuex';

Shopware.Component.register('sw-product-detail-cross-selling', swProductDetailCrossSelling);

const product = {};
const store = new Vuex.Store({
    modules: {
        swProductDetail: {
            namespaced: true,
            getters: {
                isLoading: () => false,
            },
            state: {
                product: product,
            },
        },
        context: {
            namespaced: true,

            getters: {
                isSystemDefaultLanguage() {
                    return true;
                },
            },
        },
    },
});

async function createWrapper() {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('asset', () => {});
    localVue.directive('tooltip', {});

    return shallowMount(await Shopware.Component.build('sw-product-detail-cross-selling'), {
        localVue,
        propsData: {
            crossSelling: null,
        },
        stubs: {
            'sw-card': true,
            'sw-button': true,
            'sw-product-cross-selling-form': true,
            'sw-empty-state': true,
            'sw-skeleton': true,
        },
        mocks: {
            $store: store,
        },
        provide: {
            repositoryFactory: {
                create: () => ({ search: () => Promise.resolve('bar') }),
            },
            acl: { can: () => true },
        },
    });
}

function buildProduct() {
    return {
        crossSellings: [
            {
                assignedProducts: [
                ],
            },
        ],
    };
}

describe('src/module/sw-product/view/sw-product-detail-cross-selling', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = await createWrapper();
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should be a Vue.JS component', async () => {
        expect(wrapper.vm).toBeTruthy();
    });

    it('should load assigned products', async () => {
        const customProduct = buildProduct();
        await wrapper.setData({ product: customProduct });

        expect(customProduct.crossSellings[0].assignedProducts).toBe('bar');
    });
});
