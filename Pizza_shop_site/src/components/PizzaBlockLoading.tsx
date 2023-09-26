import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockLoading = () => (
   <div className="wrapper-pizza-block">
      <ContentLoader
         speed={2}
         width={280}
         height={420}
         viewBox="0 0 280 420"
         backgroundColor="#f3f3f3"
         foregroundColor="#ecebeb"
      >
         <circle cx="140" cy="125" r="125" />
         <rect x="40" y="270" rx="7" ry="7" width="200" height="24" />
         <rect x="10" y="314" rx="10" ry="10" width="260" height="43" />
         <rect x="10" y="384" rx="7" ry="7" width="95" height="27" />
         <rect x="120" y="374" rx="25" ry="25" width="150" height="46" />
      </ContentLoader>
   </div>
)

export default PizzaBlockLoading