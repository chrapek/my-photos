import {
  pgTable,
  serial,
  timestamp,
  varchar,
  json,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const metadatas = pgTable('metadata', {
  id: serial('id').primaryKey(),
  width: varchar('width'),
  height: varchar('height'),
  xResolution: varchar('x_resolution'),
  yResolution: varchar('y_resolution'),
  resolutionUnit: varchar('resolution_unit'),
  fileSize: varchar('file_size'),
  latitude: varchar('latitude'),
  longitude: varchar('longitude'),
  make: varchar('make'),
  model: varchar('model'),
  lensModel: varchar('lens_model'),
  lensMake: varchar('lens_model'),
  megapixels: varchar('megapixels'),
  focalLength: varchar('focal_length'),
  orientation: varchar('orientation'),
  fNumber: varchar('f_number'),
  shutterSpeedValue: varchar('shutter_speed_value'),
  apertureValue: varchar('aperture_value'),
  brightnessValue: varchar('brightness_value'),
  lightValue: varchar('light_value'),
  exposureTime: varchar('exposure_time'),
  subjectDistance: varchar('subject_distance'),
  meteringMode: varchar('metering_mode'),
  flash: varchar('flash'),
  exposureMode: varchar('exposure_mode'),
  whiteBalance: varchar('white_balance'),
  digitalZoomRatio: varchar('digital_zoom_ratio'),
  profileDescription: varchar('profile_description'),
  colorSpace: varchar('color_space'),
  depthOfField: varchar('depth_of_field'),
  fieldOfView: varchar('field_of_view'),

  avgBitrate: varchar('avg_bitrate'),
  duration: varchar('duration'),
  videoFrameRate: varchar('videoFrameRate'),
  
  other: json('other'),
  originalDateTime: timestamp('original_date_time'),
  modifyDate: timestamp('modify_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export type Metadata = InferModel<typeof metadatas>;
export type NewMetadata = InferModel<typeof metadatas, 'insert'>;