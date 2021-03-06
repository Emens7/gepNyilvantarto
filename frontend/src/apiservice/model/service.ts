/**
 * Vehicle database API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Entity } from './entity';
import { ServiceAllOf } from './serviceAllOf';
import { ServiceData } from './serviceData';


export interface Service { 
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    summary: string;
    serviceDate: string;
    odometerValue: number;
    expense: number;
    description: string | null;
    vehicleId: string;
    userId: string;
}

