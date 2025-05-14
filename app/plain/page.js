import React from 'react'

const plain = () => {
  return (
    <div
  class="flex-col justify-center items-center  bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 p-6 mx-auto my-50"
>
  <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
  <stripe-pricing-table
    pricing-table-id="prctbl_1QYl8ACVA8s1lzSpTKMzVjdr"
    publishable-key="pk_test_51QYjYCCVA8s1lzSpHFiti6Xscpre9fdMizP1PfeNdSnAinbSGWadr0hSKOhLNOcEg3nQjhMiM8RfVUQ3yyMyGyxD00ccFCXjhj"
    class="rounded-4xl shadow-lg overflow-hidden"
  >
  </stripe-pricing-table>
</div>

  

  )
}

export default plain
