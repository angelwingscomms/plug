export type Product = {
    n: string, //name
    i: string, //display_image
    a: string, //about
    p: string, //price
    u: string, //user id
}

export type ProductListing = Product & {
    uf: string, //username
}