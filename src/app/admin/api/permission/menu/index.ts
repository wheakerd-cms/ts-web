import request from "@/app/admin/axios";

export const SaveApi = (data: any) => {
	return request.post({url: 'permission/menu/save', data: data});
};

export const GetTableApi = (data: any) => {
	return request.post({url: 'permission/menu/table', data: data});
};