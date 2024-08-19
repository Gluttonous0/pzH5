//返回结果
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

//分页类型
export interface Pagination {
  pageNum: number
  pageSize: number
}

//分页返回结果
export interface Results<T = any> {
  list: [T]
  total: number
}

//登录
export namespace Login {
  export interface CreateParams {
    userName: string
    passWord: string
  }
  export interface Authentication extends CreateParams {
    validCode: string
  }
}

//菜单管理
export namespace Menu {
  export interface MenuSelectItem {
    id: number
    label: string
    children?: MenuSelectItem[]
    disabled: boolean
  }

  export interface CreateParams {
    name: string
    permissions: string
    id: string
  }
  export interface MenuList {
    id: number
    name: string
    permission: []
    permissionName: string
  }
  export interface PermissionParams {
    children?: PermissionParams[]
    component?: string
    meta: MetaParams
    name: string
    path: string
  }
  export interface MetaParams {
    describe?: string
    icon: string
    id?: string
    name: string
    path: string
  }
}

//账号管理
export namespace User {
  export interface Params {
    active: number
    create_time: number
    id: number
    mobile: string
    name: string
    permissions_id: number
  }
  export interface UserSelect {
    id: string
    name: string
  }
  export interface updateParams {
    permissions_id: number
    name: string
  }
}

//陪护师
export namespace Staff {
  export interface Params extends CreateParams {
    create_time: number
  }
  export interface CreateParams {
    id: string
    name: string
    mobile: string
    avatar: string
    sex: string
    age: number
    active: number
  }
  //陪护师照片
  export interface PhotoList {
    name: string
    url: string
  }
}

//H5首页
export namespace H5Home {
  export interface HospitalsParams {
    avatar_url: string
    id: number
    intro: string
    label: string
    name: string
    rank: string
  }
  export interface SlidesParams {
    id: number
    pic_image_url: string
    stype: string
    stype_link: string
    stype_text: string
    title: string
  }
  export interface NavsParams extends SlidesParams {
    cat_text: string
    tcolor: string
  }

  export interface Params {
    hospitals: HospitalsParams[]
    nav2s: NavsParams[]
    navs: NavsParams[]
    now: number
    slides: SlidesParams[]
  }
}

//陪护师
export namespace Companion {
  export interface CompanionList {
    age: number
    id: number
    mobile: string
    name: string
  }
  export interface HospitalsList {
    id: number
    name: string
    service_id: number
    service_price: string
  }
  export interface ServiceParams {
    serviceImg: string
    serviceName: string
  }
  export interface Params {
    hospitals: HospitalsList[]
    companion: CompanionList[]
    service: ServiceParams[]
  }
}

export namespace Order {
  export interface CreateParams {
    hospital_id: string
    hospital_name: string
    starttime: number
    companion_id: number
    receiveAddress: string
    tel: string
    demand: string
  }
  export interface Params {
    companion_id: number
    demand: string
    hospital_id: number
    hospital_name: string
    order_start_time: number
    out_trade_no: string
    paidPrice: string
    price: string
    receiveAddress: string
    serviceImg: string
    service_name: string
    service_state: string
    starttime: string
    tel: string
    time_end: string
    trade_state: string
    transaction_id: string
    user_id: string
    code_url: string
    client: {
      id: number
      mobile: string
      name: string
    }
    companion: {
      age: number
      avatar: string
      id: number
      mobile: string
      name: string
      sex: string
    }
  }
}
