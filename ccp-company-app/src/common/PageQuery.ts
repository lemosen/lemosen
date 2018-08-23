/**
 * Created by gonglei on 16/5/25.
 */


/**
 * 分页参数类
 */
export class PageQuery {


    /**
     * 分页参数
     */
    private requests = {
        offset: 0,
        limit: 10,
        filters: null,
        orFilters: null,
        data: null,
        sort: null,
        order: null
    };

    /**
     * 分页返回的参数
     * @type {{first: boolean, last: boolean, number: number, numberOfElements: number, size: number, sort: null, totalElements: number, totalPages: number}}
     */
    private responses = {
        first: false,
        last: false,
        number: 1,
        numberOfElements: 0,
        size: 10,
        sort: null,
        totalElements: 0,
        totalPages: 1
    };

    constructor() {
    }

    resetRequests() {
        this.requests.offset = 0;
    }

    covertResponses(data) {
        this.responses.first = data.first;
        this.responses.last = data.last;
        this.responses.number = data.number;
        this.responses.numberOfElements = data.numberOfElements;
        this.responses.size = data.size;
        this.responses.sort = data.sort;
        this.responses.totalElements = data.totalElements;
        this.responses.totalPages = data.totalPages;
    }

    isLast() {
        return this.responses.last;
    }

    plusPage() {
        this.requests.offset += this.requests.limit;
    }

    pushParamsRequests(key, value) {
        if (this.requests.data == null) {
            this.requests.data = {};
        }
        this.requests.data[key] = value;
    }

    clearParamsRequests() {
        this.requests.data = {};
    }

    clearFilters() {
        this.requests.filters = null;
        this.requests.orFilters = null;
    }

    addFilter(filedName, value, operator) {
        if (this.requests.filters == null) {
            //如果当前过滤器为空，则创建一个新的
            this.requests.filters = [];
        }
        this.removeFilter(filedName);
        this.requests.filters.push({
            field: filedName,
            operator: operator,
            value: value
        });
    }

    addFilterOr(filedName, value, operator) {
        if (this.requests.orFilters == null) {
            //如果当前过滤器为空，则创建一个新的
            this.requests.orFilters = [];
        }
        this.removeFilterOr(filedName);
        this.requests.orFilters.push({
            field: filedName,
            operator: operator,
            value: value
        });
    }



    addFilterEq(filedName, value) {
        this.addFilter(filedName, value, "eq");
    }

    removeFilter(filedName) {
        if (this.requests.filters != null) {
            let filters = this.requests.filters;
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].field == filedName) {
                    filters.splice(i, 1);
                    break;
                }
            }
        }
    }

    removeFilterOr(filedName) {
        if (this.requests.orFilters != null) {
            let filters = this.requests.orFilters;
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].field == filedName) {
                    filters.splice(i, 1);
                    break;
                }
            }
        }
    }

    setSort(sortName, value) {
        this.requests.sort = sortName;
        this.requests.order = value;
    }

    toJsonString() {
        return JSON.stringify(this.requests);
    }
}