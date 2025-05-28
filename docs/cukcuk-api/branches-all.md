# Branchs API | CUKCUK OpenPlatform API

API trả về danh sách chi nhánh của nhà hàng

Các thông tin cấu hình cần thiết:

| Tên         | Mô tả                |
| ----------- | -------------------- |
| CompanyCode | Mã nhà hàng lấy      |
| AccessToken | Chuỗi token xác thực |

Để lấy các thông tin trên xem bài viết [account/login](index.html)

## About

| URL                | Phiên bản |
| ------------------ | --------- |
| graphapi.cukcuk.vn | 1.0       |

## Schemes

| Scheme |
| ------ |
| https  |

## Endpoints

### api/v1/branchs/all

#### POST

Lấy danh sách chi nhánh của nhà hàng

##### Expected Response Types

- HttpCode: 401
  - ServiceResult.ErrorType:
  - Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
- HttpCode: 200
  - ServiceResult.ErrorType: 0
  - Mô tả: Không có lỗi
- HttpCode: 200
  - ServiceResult.ErrorType: 1
  - Mô tả: Tham số không hợp lệ null or empty
- HttpCode: 200
  - ServiceResult.ErrorType: 2
  - Mô tả: Mã nhà hàng không tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 7
  - Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu
- HttpCode: 200
  - ServiceResult.ErrorType: 100
  - Mô tả: Lỗi nội bộ API Graph
- HttpCode: 200
  - ServiceResult.ErrorType: 102
  - Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại.

##### Parameters

| Name            | In  | Description                                               | Required? | Type |
| --------------- | --- | --------------------------------------------------------- | --------- | ---- |
| includeInactive | uri | true - lấy toàn bộ bao gồm cả chi nhánh đã ngừng theo dõi | false     | bool |

| Name          | In     | Description                                               | Required? | Type   |
| ------------- | ------ | --------------------------------------------------------- | --------- | ------ |
| Authorization | header | Header key cấu hình AccessToken (dạng Bearer AccessToken) | true      | string |
| CompanyCode   | header | Header key cấu hình mã nhà hàng CompanyCode               | true      | string |

Ví dụ:

```
CompanyCode: demoquanviet
Authorization: Bearer 06S1YMPgDJl65xE5tYzAJlNmVALHVHlLZg9euMUaUTO9C0Jm8TL3L4isto97ApKdQbVVX2rUJUTfXbBBipo1B5UvAgl3hwDYh8bNGVVUNp6B99Ht3KZQkwVh2SNblX-vulGSNatV-NF1KOfNJImOUsVXimxVEX3n2lnRV0A_mbJ_XP0sliGqbMzwa9YtY-jts4Iu06TaFOqBpBhndS-mofDlZlKkVqYklwy6cDzBktas7Xfi5MOsCujCDYO_0WFauBQCPDVnSj6ew_3Nm5ollwynkmErSmVf2E4cShM4700

```

##### Content Types Produced

| Produces         |
| ---------------- |
| application/json |

##### Content Types Consumed

| Consumes         |
| ---------------- |
| application/json |

##### Response

Trả về đối tượng [ServiceResult](#serviceresult-definition) với ServiceResult.Data là Array<[Branch](#branch-definition)\>

##### Example

Ví dụ gọi **GET** tới

[https://graphapi.cukcuk.vn/api/v1/categories/list?includeInactive=true](https://graphapi.cukcuk.vn/api/v1/categories/list?includeInactive=true)

Hệ thống sẽ trả về [ServiceResult](#serviceresult-definition) với Data là Array<[Branch](#branch-definition)\> JSON response

```
{
  "Code": 200,
  "Data": [
    {
      "Id": "f7a8b9c2-3d4e-5f67-8901-a23b4c5d6e7f",
      "Code": "demoquanviet",
      "Name": "demoquanviet",
      "IsBaseDepot": false,
      "Inactive": false
    }
  ],
  "Total": 0,
  "Success": true
}

```

## Definitions

### Branch Definition

| Property      | Type   | Format | Mô tả                    |
| ------------- | ------ | ------ | ------------------------ |
| Id            | string | guid   | Id chi nhánh             |
| Code          | string |        | Mã chi nhánh             |
| Name          | string |        | Tên chi nhánh            |
| IsBaseDepot   | bool   |        | True - là kho tổng       |
| IsChainBranch | bool   |        | True - là chuỗi nhà hàng |

### ServiceResult Definition

| Property     | Type   | Format | Mô tả                                      |
| ------------ | ------ | ------ | ------------------------------------------ |
| Code         | int    |        | Mã lỗi HttpCode (200, 500...)              |
| ErrorType    | int    |        | Loại lỗi                                   |
| ErrorMessage | string |        | Thông tin lỗi                              |
| Success      | bool   |        | True - không có lỗi logic xảy ra           |
| Data         | string | object | Dữ liệu trả về client                      |
| Total        | int    |        | Tổng số bản ghi khi lấy dữ liệu phân trang |

### ErrorType Definition

- Dải mã lỗi chung

- HttpCode: 401
  - ServiceResult.ErrorType:
  - Mô tả: Chuỗi AccessToken hết hạn hoặc không hợp lệ cần phải gọi cấp phát lại
- HttpCode: 200
  - ServiceResult.ErrorType: 0
  - Mô tả: Không có lỗi
- HttpCode: 200
  - ServiceResult.ErrorType: 1
  - Mô tả: Tham số không hợp lệ null or empty
- HttpCode: 200
  - ServiceResult.ErrorType: 2
  - Mô tả: Mã nhà hàng không tồn tại
- HttpCode: 200
  - ServiceResult.ErrorType: 3
  - Mô tả: Mã Appid không tồn tại trên hệ thống
- HttpCode: 200
  - ServiceResult.ErrorType: 4
  - Mô tả: Chuỗi thông tin chữ ký đăng nhập không hợp lệ, timeout
- HttpCode: 200
  - ServiceResult.ErrorType: 5
  - Mô tả: Tham số lấy phân trang vượt quá số lượng cấu hình cho phép (max 100)
- HttpCode: 200
  - ServiceResult.ErrorType: 6
  - Mô tả: Tham số ngày giờ không hợp lệ (01/01/1753 - 31/12/9999)
- HttpCode: 200

  - ServiceResult.ErrorType: 7
  - Mô tả: Thiết lập kết nối CUKCUK đang ở trạng thái ngắt, không thể lấy dữ liệu

- Dải mã lỗi nghiêm trọng

- HttpCode: 200
  - ServiceResult.ErrorType: 100
  - Mô tả: Lỗi nội bộ API Graph
- HttpCode: 200
  - ServiceResult.ErrorType: 102
  - Mô tả: Request bị từ chối, do có request cùng loại đang xử lý. Vui lòng chờ xử lý xong hoặc chờ request đang xử lý timeout thì gọi lại. Ví dụ: Khi đang gọi api login mà api chưa trả về dữ liệu lại tiếp tục gọi request login này sẽ trả về lỗi này.
