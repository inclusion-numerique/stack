UPDATE images
SET
    crop_height = ROUND(crop_height::numeric, 4)::float8,
    crop_width = ROUND(crop_width::numeric, 4)::float8,
    crop_top = ROUND(crop_top::numeric, 4)::float8,
    crop_left = ROUND(crop_left::numeric, 4)::float8;
