function OrderResume ({ cart, total }) {
  return (
    <div className='container'>
      <h1>Votre commande</h1>
      <table>
        <thead>
          <th>Plat</th>
          <th>Quantité</th>
          <th>Prix</th>
        </thead>
        <tbody>
          {
            cart.map(item => {
              return (
                <tr key={item.dish._id}>
                  <td>{item.dish.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dish.price.toFixed(2)}€</td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td>Total :</td>
            <td>{total.toFixed(2)}€</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default OrderResume
