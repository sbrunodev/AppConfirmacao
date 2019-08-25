export class Paginacao {
    // Pagination
    pages: any;
    currentPage: number = 1;
    totalPages: number;

    pagination(page: number, type: string = "") {
        let flag = false;
        switch (type) {

            case 'ant': {
                if (this.currentPage != 1) {
                    this.currentPage -= 1;
                    flag = true;
                }
            } break;

            case 'prox': {
                if (this.currentPage != this.totalPages) {
                    this.currentPage += 1;
                    flag = true;
                }
            } break;

            default: {
                this.currentPage = page;
                flag = true;
            } break;
        }

        return flag;
    }

    loadPages() {

        let defPages = 5; // default Itens Pages
        let itensPorPagina = this.totalPages - this.currentPage;

        if (itensPorPagina > defPages)
            itensPorPagina = defPages;
        else
            if (itensPorPagina == 0)
                itensPorPagina = 1;

        this.pages = Array(itensPorPagina).fill(0);

        let valor = 1;
        if (this.currentPage >= defPages)
            valor = this.currentPage - 2;

        for (let i = 0, x = valor; i < defPages; i++ , x++) {
            if (x <= this.totalPages)
                this.pages[i] = x;
        }

    }
}