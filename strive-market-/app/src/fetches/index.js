import axios from 'axios'

export const getProducts = async () => {
    const get = {
        method:"GET",
        url:("http://localhost:3002/products")
    }
    let products = await axios(get)
    return products
}
export const getSingleProduct = async (productid) => {
    const get = {
        method:"GET",
        url:(`http://localhost:3002/products/${productid}`)
    }
    let product = await axios(get)
    return product
}

export const postProduct = async () => {
    const post = {
        method:"POST",
        url:("http://localhost:3002/products/"),
        Headers:new Headers({
            'Content-Type':'application/json'
        })
    }
    let product = await axios(post)
    return product
}

export const editProduct = async (productid) => {
    const put = {
        method:"PUT",
        url:(`http://localhost:3002/products/${productid}`),
        Headers:new Headers({
            'Content-Type':'application/json'
        })
    }
    let product = await axios(put)
    return product
}


// export const editProduct = async (productid) => {
//     const delete = {
//         method:"DELETE",
//         url:(`http://localhost:3002/products/${productid}`),
//         Headers:new Headers({
//             'Content-Type':'application/json'
//         })
//     }
//     let product = await axios(delete)
//     return product
// }



export const getReviews = async () => {
    const get = {
        method:"GET",
        url:("http://localhost:3002/reviews")
    }
    let reviews = await axios(get)
    return reviews
}