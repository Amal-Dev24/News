async function getData(category = "business", search = "", page = 1) {
    let parameters = new URLSearchParams({
        category: category,

        q: search,
        from: "2026 -09 - 25",
        sortBy: "publishedAt",
        page: page,
        pageSize: 10

    }),
        response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}&apiKey=aa05da88053d41318e53a01da6718cf4`),
        data = await response.json();
    // console.log(data);
    showData(data, page)
};

function showData(data, currentPage) {

    let numberofpages = Math.ceil(data.totalResults / 10),
        news = data.articles;
console.log(news);
    $data.html("");

    if (news?.length > 0) {
        for (let item of news) {
            $data.append(cardComponent(item));
            // console.log($data.append(cardComponent()))
        };

        $("nav .pagination").html(preparePagination(currentPage, numberofpages));

    } else {

        $data.html(`<p class="py-4 text-center mx-auto">Not found data try again</p>`)

    }

};

function cardComponent(item) {
    return `<div class="col-lg-4   mb-4">
                   <div class="item ">
                         <div class="card m-auto" style="max-width: 320px; height:460px">
                        <img src="${item.urlToImage}" onerror = "this.src='images/defualt.jpg'" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${item.title?.slice(0, 20)}</h4>
                            <p class="card-text">${item.description?.slice(0, 200)}</p>
                            <a href="${item.url}" target= "_blank" class="">See More</a>
                        </div>
                    </div>
                   </div>

                </div>`;
};

function preparePagination(currentPage, totalPages) {
    let liList = "";
    liList += `<li class="page-item ${(currentPage == 1) ? 'disabled' : ''}" onclick="paginate(${(currentPage > 1) ? (currentPage - 1) : 1})"><span class="page-link">Previous</span></li>`;

    for (let i = 1; i <= totalPages; i++) {
        liList += `
        <li class="page-item ${(currentPage == i) ? 'active' : ''}" onclick="paginate(${i})"><span class="page-link">${i}</span></li>
        `
    }
    liList += `<li class="page-item ${(currentPage == totalPages) ? 'disabled' : ''}" onclick="paginate(${(currentPage < totalPages) ? (currentPage + 1) : totalPages})"><span class="page-link">Next</span></li>`
    return liList
};

function paginate(PageNumber) {
    let category = $("#Category").val(),
        search = $("#Search").val();
    getData(category, search, PageNumber);
}
