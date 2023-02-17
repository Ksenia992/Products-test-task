export interface ITable {
    product_name: string
    id: number
    checked: boolean
    price: number | string
    qty: number | string
    sum?: number
}
