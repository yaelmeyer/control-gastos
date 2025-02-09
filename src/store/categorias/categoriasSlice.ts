import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface categoriasFiltros{
    categorias: string[]
}

const initialState: categoriasFiltros = {
    categorias : []
}

const categoriasSlice = createSlice({
    name: 'filtros',
    initialState,
    reducers: {
        addCategoria: (state, action: PayloadAction<string>) => {
            if(!state.categorias.includes(action.payload)){
                state.categorias.push(action.payload)
            }
        },
        deleteCategotia:(state, action: PayloadAction<string>) => {
            state.categorias = state.categorias.filter(categoria => categoria !== action.payload)
        }
    }
})

export const {addCategoria, deleteCategotia} = categoriasSlice.actions

export default categoriasSlice.reducer