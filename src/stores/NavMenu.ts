import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance.js'
type NavMenuState= {
    Menu: { location: string, items: MenuItem[] }[] // Array to hold location and items
}

type MenuItem= {
    title: string
    url: string
    sortorder: number
    children?: MenuItem[]
}


export const useNavMenu = defineStore('NavMenu', {
    state: (): NavMenuState => ({
        Menu: []
    }),
    actions: {
        async topMenu(id: number, location: string = 'header') {
            try {
                const apiUrl = `nav/${id}/links`
                const existingMenu = this.Menu.find(menu => menu.location === location)

                if (!existingMenu) {
                    const response = await axiosInstance.get(apiUrl)
                    if (response.status === 200) {
                        this.Menu.push({ location, items: response.data.data })
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },
    },
    persist: {
        key: 'Menus'
    }
})
