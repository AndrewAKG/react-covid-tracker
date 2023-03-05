export interface UserData {
	_id: string;
	userId: string;
	username: string;
	latitude: number;
	longitude: number;
	temperature: number;
	oxygenLevel: number;
	timestamp: number;
}

export interface GetUserVitalsHistoryResponse {
	data: UserData[];
}

export interface GetAllUsersDataResponse {
	data: UserData[];
}

export interface AddUserDataRequest {
	latitude: number;
	longitude: number;
	temperature: number;
	oxygenLevel: number;
}
