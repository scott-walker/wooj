<?php

// $types;

$types = [
    'x' => null,
    'y' => [] == false,
    'z' => empty(false),
];

// // var_dump(isset($x));
// var_dump($types);
// var_dump(isset($types));

// echo sqrt(10);

$ab = 123;

$closure = function (int $x) use ($ab): float|int {
    return $x + $ab;
};

echo $closure(1) . PHP_EOL;
