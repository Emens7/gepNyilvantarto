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
import { VehicleAllOf } from './vehicleAllOf';
import { VehicleData } from './vehicleData';


export interface Vehicle { 
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    make: string;
    model: string;
    manufactureYear: number;
    licensePlate: string;
    vin: string | null;
    userId: string;
}
