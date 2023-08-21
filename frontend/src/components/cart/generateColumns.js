export function generateColumns({ isPartOfPurchaseView }) {
    return (
      [
        ...(!isPartOfPurchaseView ? [{
          label: <strong></strong>,
          field: 'button'
        }] : []),
        {
          label: <strong>Image</strong>,
          field: 'imageSrc',
        },
        {
          label: <strong>Cart</strong>,
          field: 'name'
        },
        {
          label: <strong>Size</strong>,
          field: 'size'
        },
        {
          label: <strong>Price</strong>,
          field: 'price'
        },
        {
          label: <strong>Quantity</strong>,
          field: 'quantity'
        },
        {
          label: <strong>Amount</strong>,
          field: 'amount'
        },
        ...(!isPartOfPurchaseView ? [{
          label: <strong>Delete</strong>,
          field: 'button'
        }] : []),
      ]
    )
  }