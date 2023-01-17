import http, {server} from '../http';
export const getNotification = async (pageLength: number, page: number) => {
  const {data} = await http.get(
    `${server}/notifications?pageLength=${pageLength}&page=${page}`,
  );
  return data;
};
