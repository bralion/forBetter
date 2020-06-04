/**
* @Description:
* @author Yangchaolin
* @date 2020/6/4
*/
/**
 * 网络请求封装  项目内请走这个
 * @param params 请求的参数
 * @return {Promise<any>}
 */
export const request = params =>{
	const requestParams = {
		...params,
		method:(params.method && params.method.toUpperCase()) || 'GET',
	}
	return fetch(requestParams.url,requestParams).then(res => res.json())
}
