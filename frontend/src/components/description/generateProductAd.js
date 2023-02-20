export function generateProductAd(productNameForAdd) {
    let productAd = "";
    if (productNameForAdd === "boots") {
        productAd = "Stylish boots| Great coomfort and support| Synthetic | Split grooves "
    }
    else if (productNameForAdd === "jerseys") {
        productAd = "Super-premium fabric| Lycra sleeves | Side Mesh | Silicon Elastic Bottom Grip| Customizable"
    }
    else {
        productAd = "Premium quality accessories| Exported from the best places"
    }
    return productAd
}