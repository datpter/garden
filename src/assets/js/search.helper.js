export const searchProduct = function (query, tabContent) {
    fetch("https://localhost:7293/api/Room")
        .then(res => res.json())
        .then(data => {
            const results = data.filter(e => e.name.toLowerCase().includes(query.toLowerCase()));
            tabContent.innerHTML = "";

            results.forEach((element, index) => {
                tabContent.insertAdjacentHTML("beforeend", `
                <div class="col-4">
              <div class="ltn__product-item">
                <div class="img">
                  <a href=""><img src="${`https://localhost:7293/resources/`+element.image}"></a>
                  <div class="product-badge">
                    <ul>
                      <li class="badge-1">HOT</li>
                    </ul>
                  </div>
                </div>
                <div class="intro">
                  <h2 class="product-title1">
                    <a href="">${element.name}</a>
                  </h2>
                  <div class="product-price">
                    <span>${element.price}</span>
                  </div>
                </div>
              </div>
            </div>
                `);
            });
        });
}
