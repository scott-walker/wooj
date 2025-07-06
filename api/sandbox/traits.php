<?php

trait TraitA
{
    protected array $collection = [];

    public function push(mixed $value): static
    {
        echo "Call push of TraitA\n";
        $this->collection[] = $value;

        return $this;
    }

    public function getCollection(): array
    {
        echo "Call getCollection of TraitA\n";
        return $this->collection;
    }
}

trait TraitC
{
    protected array $collection = [];

    public function push(mixed $value): static
    {
        echo "Call push of TraitC\n";
        $this->collection[] = $value;

        return $this;
    }

    public function getCollection(): array
    {
        echo "Call getCollection of TraitC\n";
        return $this->collection;
    }
}

trait TraitB
{
    use TraitC;
    // private array $collection = [];

    // public function push(mixed $value): static
    // {
    //     echo "Call push of TraitB\n";
    //     $this->collection[] = $value;

    //     return $this;
    // }

    // public function getCollection(): array
    // {
    //     echo "Call getCollection of TraitB\n";
    //     return $this->collection;
    // }
}


class PusherParent
{
    use TraitA;

    // private array $collection = [];

    // public function getCollection(): array
    // {
    //     echo "Call getCollection of PusherParent\n";
    //     return $this->collection;
    // }
}

class Pusher extends PusherParent
{
    use TraitB;
    // use TraitA, TraitB {
    //     TraitB::push insteadof TraitA;
    //     TraitA::getCollection insteadof TraitB;
    // }

    public const string ID = 'pusher';

    public function __construct(
        public readonly string $id = self::ID
    ) {}

    public function getCollection(): array
    {
        echo "Call getCollection of Pusher\n";
        // return $this->collection;
        return parent::getCollection();
    }
}

$pusher = new Pusher();
$pusher->push(1);
$pusher->push(2);
$collection = $pusher->getCollection();

echo "ID: {$pusher->id}\n";
print_r($collection);
