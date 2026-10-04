<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Records mutating CMS API calls (POST/PUT/DELETE) to activity_logs.
 * Failures while logging must never break the actual mutation.
 */
class LogActivity
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        try {
            if (! in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
                return $response;
            }

            if ($response->getStatusCode() >= 400) {
                return $response;
            }

            $segments = $request->segments(); // e.g. api / news / 5
            $module = $segments[1] ?? 'system';
            $target = $segments[2] ?? null;

            ActivityLog::create([
                'user_id' => $request->user()?->id,
                'user_name' => $request->user()?->name ?? 'System',
                'action' => $request->method() . ' ' . $request->path(),
                'module' => (string) $module,
                'target' => $target ? "#{$target}" : null,
                'status' => 'Success',
            ]);
        } catch (\Throwable) {
            // Logging must never break CMS mutations.
        }

        return $response;
    }
}
