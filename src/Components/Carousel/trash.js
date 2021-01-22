useEffect(() => {
  // Sorters

  ///
  switch (title) {
    case "Popular Restaurants":
      return sortbyPopular();
    case "New Restaurants":
      return sortbyDate();
    case "Nearby Restaurants":
      return sortbyPopular();
    default:
      return;
  }
}, [title, allRestaurants]);
