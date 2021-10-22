import DishesListItem from './DishesListItem'

function DishesList ({ dishes }) {
  if (!dishes || dishes.length < 1) {
    return (
      <h1>Aucun plat</h1>
    )
  }
  return (
    <div className='list-container'>
      {dishes.map(dish => {
        return (
          <DishesListItem key={dish._id} dish={dish} />
        )
      })}
    </div>
  )
}

export default DishesList
