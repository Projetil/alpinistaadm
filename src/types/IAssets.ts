    export interface GetAssetsRequest {
        companyId: number,
        pageNumber: number,
        pageSize: number,
        domainName?: string,
        severityType?: number
    }

    export interface GetAssetsResponse{
        totalItems: number,
        items: GetAssetsItem[]
    }

    export interface GetAssetsItem {
        id: number,
        hostname: string,
        ip: string,
        description: string
    }