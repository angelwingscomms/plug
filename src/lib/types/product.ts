export type Product = {
    n: string, //name
    i: string, //display_image
    ii: string[], //images
    a: string, //about
    p: string, //price
    u: string, //user id
}

export type ProductListing = Product & {
    uf: string, //username
}