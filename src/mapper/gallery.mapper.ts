"use strict";

import {gallery as Gallery, image as Image} from "../models/";
import {BaseMapper} from '.';
import moment from "moment";
import {hasSubscribers} from "diagnostics_channel";

export interface Options {
    image?: ImageOptions,
    gallery?: GalleryOptions
}
export interface ImageOptions {
    primary?:boolean;
    gallery_id?:string;
}

export interface GalleryOptions {
    slug?:string;
}


export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    public async getAllGalleries(options: Options) { //: Promise<string[] | string> {
        try {
            let paramsWhere = {}

            if (options.gallery.slug) {
                paramsWhere = JSON.parse(
                   `{
                    "slug":"${options.gallery.slug}"
                }`)

                return await Image.find(paramsWhere).then(images => {
                    console.log(images);
                    return images;
                }).catch(err => {
                    return err;
                })

            }

            console.log(paramsWhere);
            return await Gallery.find(paramsWhere).then(galleries => {

                return galleries;
            }).catch(err => {
                return err;
            })

          //  return galleries;
/*
            if (options.image.primary) {
                for (let gallery of galleries) {
                    gallery.images = await imageMapper.getPrimaryImageByGalleryId(gallery.id);
                    globalGallery.push(gallery);
                }
                return globalGallery;
            } else {

                galleries[0].images = await imageMapper.getImagesByGalleryId(options.gallery.id);
                return galleries;
            } */
        } catch (error) {

            return error.toString();
        }
    }


    public async createGallery(gallery) {
        try {
            if ((await Gallery.find(gallery)).length === 0) {
                console.log('about to enter');
                console.log(gallery);
                return await new Gallery(gallery).save();
            }

            return {'error': "Entry already exists"}
           //     console.log(await Gallery.find(gallery));


//            return await Gallery.create(gallery).then(data => {

            //      return {'success': data.toString()}
            //   }).catch(err => {
            //     return {'error': err.toString()}
            //  })
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

        }
*/

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

