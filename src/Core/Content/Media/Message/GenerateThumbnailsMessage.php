<?php declare(strict_types=1);

namespace Shopware\Core\Content\Media\Message;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\MessageQueue\AsyncMessageInterface;

#[Package('content')]
class GenerateThumbnailsMessage implements AsyncMessageInterface
{
    private array $mediaIds = [];

    private string $contextData;

    public function getMediaIds(): array
    {
        return $this->mediaIds;
    }

    /**
     * @param array<string> $mediaIds
     */
    public function setMediaIds(array $mediaIds): void
    {
        $this->mediaIds = $mediaIds;
    }

    public function getContextData(): string
    {
        return $this->contextData;
    }

    public function setContextData(string $contextData): void
    {
        $this->contextData = $contextData;
    }

    public function withContext(Context $context): GenerateThumbnailsMessage
    {
        $this->contextData = serialize($context);

        return $this;
    }

    public function readContext(): Context
    {
        return unserialize($this->contextData);
    }
}
