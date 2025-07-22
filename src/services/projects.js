import axios from "axios";
import { camelCase, snakeCase } from "lodash";
import { convertDateToISO, convertISODateToBR } from "../utils/resolvers/formatDate";

export const getProjects = (params) => new Promise((resolve, reject) => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        params,
    })
        .then((response) => {
            resolve({
                data: response.data.map((project) => {
                    const projectWithCamelCase = {};

                    Object.keys(project).forEach((key) => {
                        projectWithCamelCase[camelCase(key)] = ['start_date', 'end_date'].includes(key)
                            ? convertISODateToBR(project[key])
                            : project[key];
                    });

                    projectWithCamelCase.isFavorite = projectWithCamelCase.isFavorite == 1;

                    return projectWithCamelCase;
                }),
            });
        })
        .catch((error) => {
            reject(error);
        });
});

export const getProject = (id) => new Promise((resolve, reject) => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`)
        .then((response) => {
            resolve({
                data: {
                    ...response.data,
                    startDate: convertISODateToBR(response.data.start_date),
                    endDate: convertISODateToBR(response.data.end_date),
                    imageUrl: response.data.image_url,
                },
            });
        })
        .catch((error) => {
            reject(error);
        });
});

export const postProject = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        if (key === 'image' && !data.image) {
            return;
        }

        if (['startDate', 'endDate'].includes(key)) {
            formData.append(snakeCase(key), convertDateToISO(data[key]));
            return;
        }

        formData.append(snakeCase(key), data[key]);
    });

    return axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const putProject = ({ id, ...data }) => {
    const formData = new FormData();

    formData.append('_method', 'PUT');

    Object.keys(data).forEach((key) => {
        if (['startDate', 'endDate'].includes(key)) {
            formData.append(snakeCase(key), convertDateToISO(data[key]));
            return;
        }

        formData.append(snakeCase(key), data[key]);
    });

    return axios.post(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, formData);
};

export const patchProject = (id, is_favorite) => axios.patch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, { is_favorite });

export const deleteProject = (id) => axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
