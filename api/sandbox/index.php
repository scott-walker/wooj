<?php

// function gen(): iterable
// {
//     yield 1;
//     yield 2;
//     yield 3;
// }

// foreach (gen() as $k => $v) {
//     echo "{$k} => {$v}\n";
// }

// $arr = [5, 10, 13, 17, 20, 21, 43, 50];
// $num = count($arr);
// $res = [];

// for ($i = 0; $i < $num; $i++) {
//     $value = $arr[$i];

//     if ($value % 5 === 0) {
//         $res[] = $value;
//     }
// }

// print_r($res);

// do {
//     $n1 = rand(0, 10);
//     $n2 = rand(0, 10);
//     $n3 = rand(0, 10);
//     $sum = $n1 + $n2 + $n3;

//     print_r([
//         'sum' => $sum
//     ]);
// } while ($sum < 14);

// $value = 5;

// $output = match (true) {
//     $value > 11 => 'fuck yee!',
//     $value > 2 => 'fuck yeeeee!',
//     true => 'default'
// };

// print_r($output);
// echo PHP_EOL . PHP_EOL;

// function hello(string|array $name): string
// {
//     $name = is_string($name) ? [$name] : $name;

//     return 'Hello ' . implode(', ', $name) . '!';
// }

// echo hello(['Scott', 'Elena', 'Anna', 'Kseniya']);
// echo PHP_EOL . PHP_EOL;

// namespace App\MyLib;

// class Figure
// {
//     public function __construct(
//         public float $width = 0,
//         public float $height = 0,
//     ) {}

//     public static function create(float $width = 0, float $height = 0): static
//     {
//         return new static($width, $height);
//     }
// }

// // $sqr = new Figure(100, 100);
// $sqr = Figure::create(height: 50);
// print_r([
//     'class' => $sqr::class,
//     'width' => $sqr->width,
//     'height' => $sqr->height,
// ]);
// echo PHP_EOL;

// echo str_contains("abc", "a") ? 'true' : 'false';
// echo str_ends_with('asdasjkdh', 'Kdh') ? "true" : "false";

// $a = null;
// $b = null;
// // $c = $a ?? 1;
// $a ??= 1;
// // $a = is_null($a) ? 1 : $a;

// echo $a . " \n";

// $a = 1;
// $b = 2;

// echo "Result: " . $a + $b . "\n";

// class MyRoom
// {
//     public function __toString(): string
//     {
//         return $this::class;
//     }
// }

// $room = new MyRoom();

// echo $room . "\n";

// try {
//     $a = null;
//     $a ?? throw new Exception('Error message');
// } catch (Exception) {
//     // echo $e->getMessage() . "\n";
// }

// // echo $exception->getMessage() . "\n";

class Room
{
    protected $things = [];

    public function push($key, $value)
    {
        $this->things[$key] = $value;
    }

    public function __isset($key): bool
    {
        return isset($this->things[$key]);
    }
}

$room = new Room();
// $room->push('bad', 'my_bad');

echo isset($room->bad) ? 'true' : 'false';
