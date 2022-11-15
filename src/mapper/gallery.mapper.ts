"use strict";

import {Gallery} from "../models/";
import {BaseMapper, imageMapper} from '.';
import {options} from "../db/Sequelize";

export interface Options {
    image?: ImageOptions,
    gallery?: GalleryOptions
}
export interface ImageOptions {
    primary?:boolean;
    gallery_id?:string;
}

export interface GalleryOptions {
    id?:string;
}


export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';



    public async getAllGalleries(options: Options) { //: Promise<string[] | string> {
        try {
            const globalGallery = [];
            let paramsWhere = {};

            if  (options.gallery.id) {
                paramsWhere = {
                    where: JSON.parse(`{
                    "id":"${options.gallery.id}"
                }`)
                }
            }

            const galleries = await Gallery.findAll(paramsWhere).then(gallery => {
                return gallery;
           //     return this.processArray(gallery);
            }).catch(err => {
                return err;
            })

/*            if (options.image.primary) {
                for (let gallery of galleries) {
                    gallery.images = await imageMapper.getPrimaryImageByGalleryId(gallery.id);
                    globalGallery.push(gallery);
                }
                return globalGallery;
            } else {

                galleries[0].images = await imageMapper.getImagesByGalleryId(options.gallery.id);
                return galleries;
            } */
            return options;
        } catch (error) {

            return error.toString();
        }
    }


    public async createGallery(gallery) {
        try {
            return await Gallery.create(gallery).then(data => {

                return {'success': data.toString()}
            }).catch(err => {
                return {'error': err.toString()}
            })
        } catch (error) {
            return {'error': error.toString()}
        }
    }

    /*
        static async getGalleryWithImages(params) {
            try {
                const gallery = {
                    include: [{
                        mode: ImageModel,
                        required: true,
                        where: {gallery: params.gallery}
                    }]
                };

                return await Gallery.findAll(gallery).then(data => {
                    return data;
                }).catch(err => {
                    return err;
                })
            } catch (error) {
                console.log(`Could not fetch galleries ${error}`)
            }
        }


        static async createGallery(body){
            try {
                const gallery = {
                    id: uuidv4(),
                    name: body.name,
                    createdAt: moment().format('YYYY-MM-DD'),
                    updatedAt: moment().format('YYYY-MM-DD'),
                    description: body.description
                };
                await Gallery.create(gallery).then(data => {
                    return data;
                }).catch(err => {
                    return err;
                })
            } catch (error) {
                console.log(`Could not fetch galleries ${error}`)
            }
        }


    /*
        static async createArticle(data){
            try {

                const Article = {
                    title: data.title,
                    body: data.body,
                    article_image: data.article_image
                }
                return await new Gallery(Article).save();
               // return response;
            } catch (error) {
                console.log(error);
            }

        }
        static async getArticlebyId(articleId){
            try {
                return await Gallery.findById({_id: articleId});
          //      return singleArticleResponse;
            } catch (error) {
                console.log(`Article not found. ${error}`)
            }
        }

        static async updateArticle(title, body, articleImage){
            try {
                return await Gallery.updateOne(
                    {title, body, articleImage},
                    {$set: {date: Date.now()}});

    //            return updateResponse;
            } catch (error) {
                console.log(`Could not update Article ${error}` );

            }
        }

        static async deleteArticle(articleId){
            try {
                return await Gallery.findOneAndDelete(articleId);
               // return deletedResponse;
            } catch (error) {
                console.log(`Could  ot delete article ${error}`);
            }

        } */


    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }

    get PARAMS_ID(): string {
        return this._PARAMS_ID;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }


    get LIST_NAME(): string {
        return this._LIST_NAME;
    }
}

export const galleryMapper = new GalleryMapper();
