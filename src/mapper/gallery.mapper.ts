"use strict";

import {Gallery} from "../models/";
import {BaseMapper, ImageMapper} from '.';

export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    public async getAllGalleries(params = {}) { //: Promise<string[] | string> {
        try {
            const globalGallery = [];
            const galleries = await Gallery.findAll(params).then(gallery => {

                return this.processArray(gallery);
            }).catch(err => {
                return err;
            })
            const imageMapper = new ImageMapper();
            for (let gallery of galleries) {
                gallery.images = await imageMapper.getImagesByGalleryId(gallery.id);
                globalGallery.push(gallery);
            }

            return globalGallery;
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
